import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { api, axios } from "../../services/config";
import { getUserInfo } from "../../services/userServices";

const Forum: NextPage = () => {
  const router = useRouter();

  useEffect(() => {

    let tokenParsed: {
        id: number,
        token: string
    }

    const token: string | null = localStorage.getItem("token");
      if (!token) router.push("/");
      else {
        tokenParsed = JSON.parse(token);
        awaitGetUser()
    }

    async function awaitGetUser() {
      const response: object = await getUserInfo(tokenParsed.id, tokenParsed.token);
      if (!response) console.log(response);
      else {
        console.log(response);
      }
    }
  });

  return <div>Forum</div>;
};

export default Forum;
