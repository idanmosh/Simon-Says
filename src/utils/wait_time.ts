const waitTime = (ms: number = 0) => {
    let timeout: ReturnType<typeof setTimeout>;

    return new Promise<void>(
        (resolve) => (
            timeout = setTimeout(() => {
                resolve();
            }, ms)
        )
    )
    .then(() => clearTimeout(timeout))
    .catch((err) => clearTimeout(timeout))
    .finally(() => clearTimeout(timeout));
}

export default waitTime;