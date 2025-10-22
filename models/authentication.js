import user from "models/user.js";
import password from "models/password.js";
import { UnauthorizedError } from "/infra/errors.js";
import { NotFoundError } from "infra/errors";

async function getAuthenticatedUser(provideEmail, providePassword) {
  let storedUser;
  try {
    storedUser = await findUserByEmail(provideEmail);
    await validatePassword(providePassword, storedUser.password);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    throw error;
  }

  return storedUser;

  async function findUserByEmail(provideEmail) {
    let storedUser;
    try {
      storedUser = await user.findOneByEmail(provideEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Senha não conferem.",
          action: "Verifique se este dado está correto.",
        });
      }
      throw error;
    }
    return storedUser;
  }

  async function validatePassword(providePassword, storedPassword) {
    const correctPasswordMatch = await password.compare(
      providePassword,
      storedPassword,
    );
    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Senha não conferem.",
        action: "Verifique se este dado está correto.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
