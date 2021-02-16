
interface IUserSnip {

    profileImageUrl: string,
    name: string,
    username: string,
};

export const UserSnip = ({ profileImageUrl, name, username }: IUserSnip) => {
    return (
        <div className="user-snip">

            {/** Profile picture circle and name*/}
            <img src={profileImageUrl} className="user-snip__avi" />
            <div className="user-snip__details">
                <p>{name}</p>
                <p className="user-snip__username">@{username}</p>
            </div>
        </div>
    );
};