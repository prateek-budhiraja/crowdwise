import { useParams } from "react-router-dom";

const CategoryPage = () => {
	const { category } = useParams();
	return <div>{category}</div>;
};

export default CategoryPage;
