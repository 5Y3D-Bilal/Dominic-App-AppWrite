import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/querysAndMutitations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src="https://i.pinimg.com/originals/ee/ab/14/eeab145208cac14b5e602d3fb642db89.jpg"
            alt=""
          />
          <span className="tracking-[2px] ml-2 text-[16px] font-semibold">
            Dominic
          </span>
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="assets/icons/logout.svg" alt="" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-female-4-1024.png"}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
