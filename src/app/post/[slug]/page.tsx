const page = ({params}: {params: {slug: string}}) => {
    return (
        <div>
            <div>{params.slug}</div>
        </div>
    );
};

export default page;
