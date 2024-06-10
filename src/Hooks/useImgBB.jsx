
import axios from 'axios';

const useImgBB = () => {
    // const axiosPublic = useAxiosPublic()
    // const [imageUrl, setImgUrl] = useState('')
    // const [image, setImage] = useState(null)
    // console.log(image);
    const handleImgBB = async (image) => {
        try {
            const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
            const formData = new FormData();
            formData.append('key', apiKey)
            formData.append('image', image)
            console.log(formData);

            const { data } = await axios.post('https://api.imgbb.com/1/upload', formData)
            console.log(data);

        } catch (error) {
            console.log(error.message);
        }

        // setImgUrl(data)
    }
    return [handleImgBB]
};

export default useImgBB;