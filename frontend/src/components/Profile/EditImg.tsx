const EditImg = ({ banner }: { banner: boolean }) => {
    return (
        <>
            <p>{banner ? "Banner" : "Profile Picture"}</p>
        </>
    )
}

export default EditImg