Perseid.match = {};

Perseid.match.AlphaNumericNonEmptyString = Match.Where(function (x) {
    check(x, String);

    x = x.trim();

    return (/^[a-z0-9 ]+$/i).test(x);
});

Perseid.match.NonEmptyString = Match.Where(function (x) {
  check(x, String);
  return x.length > 0;
});