import { useParams } from "react-router-dom";

function CampaignPage() {
	const { campaign_slug } = useParams();
	return <div>{campaign_slug}</div>;
}

export default CampaignPage;
