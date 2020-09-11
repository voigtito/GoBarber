import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './MailProvider'

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);