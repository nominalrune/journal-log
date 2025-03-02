const Card = ({children}:{children:React.ReactNode}) => {
	return <div className="bg-white rounded-xl p-6 shadow-md">
		{children}
	</div>;
}

export default Card;