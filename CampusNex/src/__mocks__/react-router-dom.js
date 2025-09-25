const useParams = jest.fn().mockReturnValue({ id: '1' });
const useNavigate = jest.fn();

module.exports = {
    useParams,
    useNavigate,
};