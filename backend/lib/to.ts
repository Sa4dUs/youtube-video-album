const to = async (promise: Promise<any>) => {
    try {
        const data = await promise;
        return [null, data];
    } catch (err) {
        return [err, null];
    }
};

export default to;
