const wrapPromise = <T>(promise: Promise<T>): { read: () => T } => {
    let status: 'pending' | 'success' | 'error' = 'pending';
    let result: T | null = null;
    let error: any = null;

    const suspender = promise.then(
        (res) => {
            status = 'success';
            result = res;
        },
        (err) => {
            status = 'error';
            error = err;
        }
    );

    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw error;
            }
            return result as T;
        }
    };
};

export default wrapPromise