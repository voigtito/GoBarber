import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file:string): Promise<string> {
        // rename é a forma de mover arquivos
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadsFolder, file),
        );
        
        //pode ter uma logica aqui para mudar o nome do arquivo se desejar

        return file;
    }

    public async deleteFile(file:string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            // se ele encontrou o arquivo
            await fs.promises.stat(filePath)
        } catch {
            // se nao tem arquivo ele retorna
            return;
        }

        // deleta o arquivo
        await fs.promises.unlink(filePath)
    }
}

export default DiskStorageProvider;