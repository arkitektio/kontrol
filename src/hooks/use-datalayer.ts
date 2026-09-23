// The datalayer (the RustFS media bucket) is not resolved through fakts: every
// gateway site that serves kontrol also routes /<bucket>* to RustFS, so it is
// simply the coord server's own base path. lok's presigned GET URLs are already
// relative for the same reason.
export const useDatalayerEndpoint = () => {
    return window.location.origin;
}
