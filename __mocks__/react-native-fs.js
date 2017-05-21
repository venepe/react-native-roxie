/**
 * React Native FS
 * @flow
 */

const RNFS = {

  // eslint-disable-next-line new-cap
  readDir: () => Promise.resolve([]),

  MainBundlePath: 'RNFSMainBundlePath',
  CachesDirectoryPath: 'RNFSCachesDirectoryPath',
  DocumentDirectoryPath: 'RNFSDocumentDirectoryPath',
  ExternalDirectoryPath: 'RNFSExternalDirectoryPath',
  ExternalStorageDirectoryPath: 'RNFSExternalStorageDirectoryPath',
  TemporaryDirectoryPath: 'RNFSTemporaryDirectoryPath',
  LibraryDirectoryPath: 'RNFSLibraryDirectoryPath',
  PicturesDirectoryPath: 'RNFSPicturesDirectoryPath',

};

export default RNFS;
