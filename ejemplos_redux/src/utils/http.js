const isSuccessful = status => {
  switch(status): {
    case 200:
    case 201:
      return true;
  }

  return false;
}
