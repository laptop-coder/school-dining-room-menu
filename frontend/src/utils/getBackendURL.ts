import { BACKEND_URL, BACKEND_URL_IP_PORT } from './consts';

const isCurrentAddressIPWithPort = () => {
  const currentHost = window.location.hostname;
  const currentPort = window.location.port;
  const isIP =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      currentHost,
    );
  return isIP && currentPort !== '';
};

const getBackendURL = () =>
  isCurrentAddressIPWithPort() ? BACKEND_URL_IP_PORT : BACKEND_URL;

export default getBackendURL;
