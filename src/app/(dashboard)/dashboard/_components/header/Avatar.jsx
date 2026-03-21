import { Avatar, AvatarFallback, AvatarImage,AvatarBadge } from "@/components/ui/avatar"

const AvatarPage = ({user}) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={user?.user_metadata?.avatar_url} />
      <AvatarFallback>AH</AvatarFallback>
       <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
    </div>
  );
};

export default AvatarPage;