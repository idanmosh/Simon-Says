
const createAction = (type: any) => {
    return (payload = {}) => ({
        type,
        payload,
    });
}

export default createAction;
