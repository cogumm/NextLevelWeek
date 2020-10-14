require("dotenv").config();
import Image from '../models/Image';

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${process.env.HOST_APP}:${process.env.PORT_APP}/uploads/${image.path}`,
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
};
