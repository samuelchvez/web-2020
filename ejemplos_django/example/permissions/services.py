# -*- coding: utf-8 -*-
"""
Various common usage processing functions.

Python module that provides common functionalities related to permissions.
"""

__version__ = '0.1.0'
__author__ = 'Samuel Chávez <me@samuelchavez.com>'
__date__ = 'August 14, 2017'
__copyright__ = 'Copyright (c) 2012-2014 Samuel Chávez'
__license__ = 'THE LICENSE'
__status__ = 'development'
__docformat__ = 'reStructuredText'


from rest_framework import permissions

BASE_KEY = 'base'
INSTANCE_KEY = 'instance'
OBJECT_KEY = 'object'
PERMISSION_KEY = 'perm'


class APIPermission(permissions.BasePermission):

    def has_permission(self, request, view):

        # Class permission configuration
        perm_config = self._get_configuration()

        # Check if there is a configuration for this action
        action_config = perm_config.get(BASE_KEY).get(view.action)

        # User
        user = request.user

        # Method
        method = request.method

        # If there is an action configuration for the currently requesting
        # action...
        if action_config:
            ac_type = type(action_config)

            # If the action configuration has a permission
            if ac_type in [str]:
                return request.user.has_perm(perm=action_config)

            # If it's a boolean (indicating pass permission condition)
            elif ac_type == bool:
                return action_config

            # If the action configuration is a function
            elif callable(action_config):
                return action_config(user, request)

            # If it is not a valid data type
            elif ac_type != dict:
                return False

            # If there is a permission key
            if PERMISSION_KEY in action_config:
                return user.has_perm(perm=action_config.get(PERMISSION_KEY))

            # Check if there is a permission configured for the request method
            elif method in action_config:

                # Method configuration
                method_config = action_config.get(method)
                mc_type = type(method_config)

                # If the method configuration has a permission
                if mc_type in [str]:

                    # Validate permission
                    return user.has_perm(perm=method_config)

                # If it's a boolean (indicating pass permission condition)
                elif mc_type == bool:
                    return method_config

                # If the method configuration is a function
                elif callable(method_config):
                    return method_config(user, request)

                # If there is a permission key
                if PERMISSION_KEY in method_config:
                    return user.has_perm(
                        perm=method_config.get(PERMISSION_KEY))

                # Assume pemission denied if not usable data type
                # Take a look: we assume there is no more configuration beyond
                return False

        # Check if it's an instance level action
        elif perm_config.get(INSTANCE_KEY).get(view.action):

            # Transfer responsability. MAKE SURE that if not using default get,
            # put and delete, you call get_object inside your detail route
            return True

        # Else, access is not allowed
        return False

    def has_object_permission(self, request, view, obj):

        # Class permission configuration
        perm_config = self._get_configuration()

        # Check if there is a configuration for this action
        action_config = perm_config.get(INSTANCE_KEY).get(view.action)

        # User
        user = request.user

        # Method
        method = request.method


        # If so
        if action_config:
            ac_type = type(action_config)

            # If the action configuration has a permission
            if ac_type in [str]:
                return (
                    user.has_perm(perm=action_config) or
                    user.has_perm(perm=action_config, obj=obj)
                )

            # If it's a boolean (indicating pass permission condition)
            elif ac_type == bool:
                return action_config

            # If the action configuration is a function
            elif callable(action_config):
                return action_config(user, obj, request)

            # If it is not a valid data type
            elif ac_type != dict:
                return False

            # If there is object configuration in the action
            if PERMISSION_KEY in action_config:

                perm = action_config.get(PERMISSION_KEY)
                return (
                    user.has_perm(perm=perm) or
                    user.has_perm(perm=perm, obj=obj)
                )

            # Check if there is a permission configured for the request method
            elif method in action_config:

                # Get method configuration
                method_config = action_config.get(method)
                mc_type = type(method_config)

                # If the method configuration has a permission
                if mc_type in [str]:
                    return user.has_perm(perm=method_config)

                # If it's a boolean (indicating pass permission condition)
                elif mc_type == bool:
                    return method_config

                # If the method configuration is a function
                elif callable(method_config):
                    return method_config(user, obj, request)

                # If it is not a valid data type
                elif  mc_type != dict:
                    return False

                # If there is object configuration in the method
                if PERMISSION_KEY in method_config:

                    perm = method_config.get(PERMISSION_KEY)
                    return (
                        user.has_perm(perm=perm) or
                        user.has_perm(perm=perm, obj=obj)
                    )

        # Else, access is not allowed
        return False


def APIPermissionClassFactory(name, permission_configuration):
    return type(str(name), (APIPermission,), {
        '_get_configuration': lambda self: permission_configuration
    })
