import { useParams } from "react-router-dom";

function CategoryPage() {
	const { category } = useParams();
	return <div>{category}</div>;
}

export default CategoryPage;
