import { configDotenv } from "dotenv";
import ImageKit from "imagekit";
configDotenv();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBKEY,
  privateKey: process.env.IMAGEKIT_PRIVKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export async function uploadImage(file) {
  try {
    const response = await imagekit.upload({
      file: file.buffer, // Dados binários da imagem
      fileName: file.originalname, // Nome original do arquivo
      folder: "/alunos", // Pasta no ImageKit
      useUniqueFileName: true, // Evita nomes duplicados
    });

    return response.url; // URL da imagem otimizada
  } catch (error) {
    console.error("Erro no upload:", error);
    throw new Error("Falha ao enviar imagem");
  }
}
export async function uploadImageFuncionario(file) {
  try {
    const response = await imagekit.upload({
      file: file.buffer, // Dados binários da imagem
      fileName: file.originalname, // Nome original do arquivo
      folder: "/funcionarios", // Pasta no ImageKit
      useUniqueFileName: true, // Evita nomes duplicados
    });

    return response.url; // URL da imagem otimizada
  } catch (error) {
    console.error("Erro no upload:", error);
    throw new Error("Falha ao enviar imagem");
  }
}

export async function uploadAtestado(file) {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      folder: "/alunos/atestados",
      useUniqueFileName: true,
    });
    return response.url;
  } catch (error) {
    console.error("Erro no upload:", error);
    throw new Error("Falha ao enviar imagem");
  }
}
