// permissions.test.js
const { getPermissionsByRole } = require('../modules/permissions/service');

describe('getPermissionsByRole', () => {
  it('debe devolver los permisos del rol admin', async () => {
    const roleId = 'admin';
    const result = await getPermissionsByRole(roleId);
    expect(result).toEqual(expect.arrayContaining(['read', 'write']));
  });

  it('debe devolver una lista vacía si el rol no existe', async () => {
    const roleId = 'nonexistent';
    const result = await getPermissionsByRole(roleId);
    expect(result).toEqual([]);
  });

  it('debe lanzar un error si el roleId está vacío', async () => {
    await expect(getPermissionsByRole('')).rejects.toThrow('El roleId es requerido');
  });
});
