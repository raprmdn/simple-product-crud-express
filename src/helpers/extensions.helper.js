module.exports = {
    extensionSupport: (extension) => {
        const extensions = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg', 'image/gif', 'image/webp'];
        return extensions.includes(extension);
    }
};
