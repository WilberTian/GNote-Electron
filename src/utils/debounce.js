export default (action, delay) => {
    let timer = null;

    return () => {
        const self = this;
        /* eslint-disable */
        const args = arguments;
        /* eslint-enable */
        clearTimeout(timer);
        timer = setTimeout(() => {
            return action.apply(self, args);
        }, delay);
    };
};
