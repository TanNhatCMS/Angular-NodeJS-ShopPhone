const router = require('express').Router();
const axios = require('axios');
function getInitials(name) {
    // Chuyển đổi tên thành các từ riêng biệt
    const words = name.split(/[ -]/);

    // Lọc ra các từ có độ dài lớn hơn 2
    const filteredWords = words.filter(word => word.length > 2);

    // Nếu có từ nào có độ dài nhỏ hơn 3, lấy hết tên, ngược lại lấy viết tắt
    return filteredWords.length > 0 ?
        filteredWords.map(word => word[0].toUpperCase()).join('') :
        name.toUpperCase();
}
router.get('/assets/avatar/:text.png', async (req, res) => {
    const { text } = req.params;
    const imageUrl = `https://dummyjson.com/image/150x150?text=${getInitials(text)}`;
    try {
        // Tải hình ảnh từ URL
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });

        // Thiết lập header và gửi hình ảnh dưới dạng phản hồi
        res.setHeader('Content-Type', 'image/png');
        res.send(Buffer.from(response.data));
    } catch (error) {
        console.error('Lỗi khi tải hình ảnh và gửi phản hồi:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
