import { configDotenv } from "dotenv";
import ImageKit from "imagekit";
configDotenv();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBKEY,
  privateKey: process.env.IMAGEKIT_PRIVKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export default async function uploadImage(file) {
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
