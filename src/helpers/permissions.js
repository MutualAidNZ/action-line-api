export function ensurePermission(requestedPermission) {
  return (req, res, next) => {
    if (req._user && req._user.permissions.includes(requestedPermission)) {
      return next();
    }

    return res.status(401).send({
      code: 'INSUFFICIENT_PERMISSIONS',
      require: requestedPermission,
    });
  };
}
