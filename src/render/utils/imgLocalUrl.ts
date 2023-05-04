export const imgLocalUrl = (imgPath: string) => {
    try {
        //dev
        //const handlePath = imgPath.replace('@', '..');
       //build
        const handlePath = imgPath.replace('@/assets', '../../../app.asar/dist');
        // https://vitejs.cn/guide/assets.html#the-public-directory
        return new URL(handlePath, import.meta.url).href;
    } catch (error) {
        console.warn(error);
    }
};