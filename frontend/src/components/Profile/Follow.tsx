const Follow = ({ following, followers }: { following?: string[], followers?: string[] }) => {

    return (
        <div className="flex gap-10">
            <p><b>{following ? following.length : 0}</b> Following</p> <p><b>{followers ? followers.length : 0}</b> Followers</p>
        </div>
    )
}

export default Follow