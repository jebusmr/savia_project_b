import { createInterface } from "readline";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAIL =
  "medinarodriguezjesus@gmail.com";

const ADMIN_NAME =
  "Jesús Medina Rodríguez";

function askQuestion(
  question: string
): Promise<string> {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    readline.question(
      question,
      (answer) => {
        readline.close();
        resolve(answer.trim());
      }
    );
  });
}

async function main() {
  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    "     CREACIÓN DE ADMINISTRADOR SAVIA"
  );
  console.log(
    "=========================================="
  );
  console.log("");

  console.log(`Nombre: ${ADMIN_NAME}`);
  console.log(`Correo: ${ADMIN_EMAIL}`);
  console.log(`Rol: ADMIN`);
  console.log("");

  // ------------------------------------------
  // 1. Comprobar si el correo ya existe
  // ------------------------------------------

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: ADMIN_EMAIL,
      },
    });

  if (existingUser) {
    console.log(
      "Ya existe una cuenta con este correo."
    );

    console.log("");
    console.log(
      `Correo: ${existingUser.email}`
    );

    console.log(
      `Rol actual: ${existingUser.role}`
    );

    console.log(
      `Estado: ${existingUser.status}`
    );

    console.log("");

    console.log(
      "No se realizó ningún cambio."
    );

    return;
  }

  // ------------------------------------------
  // 2. Solicitar contraseña
  // ------------------------------------------

  const password =
    await askQuestion(
      "Escribe la contraseña del administrador: "
    );

  if (!password) {
    throw new Error(
      "La contraseña no puede estar vacía."
    );
  }

  if (password.length < 8) {
    throw new Error(
      "La contraseña debe tener al menos 8 caracteres."
    );
  }

  // ------------------------------------------
  // 3. Generar hash
  // ------------------------------------------

  const passwordHash =
    await bcrypt.hash(password, 12);

  // ------------------------------------------
  // 4. Crear administrador
  // ------------------------------------------

  const admin =
    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        passwordHash,
        role: "ADMIN",
        status: "ACTIVE",
      },
    });

  // ------------------------------------------
  // 5. Mostrar resultado
  // ------------------------------------------

  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    "     ADMINISTRADOR CREADO CORRECTAMENTE"
  );
  console.log(
    "=========================================="
  );
  console.log("");

  console.log(`Nombre: ${ADMIN_NAME}`);
  console.log(`Correo: ${admin.email}`);
  console.log(`Rol: ${admin.role}`);
  console.log(`Estado: ${admin.status}`);

  console.log("");

  console.log(
    "El administrador puede iniciar sesión"
  );

  console.log(
    "utilizando el correo y la contraseña"
  );

  console.log(
    "que acabas de establecer."
  );

  console.log("");
}

main()
  .catch((error) => {
    console.error("");
    console.error(
      "No fue posible crear el administrador:"
    );
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });