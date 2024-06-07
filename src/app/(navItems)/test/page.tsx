"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axios";

const Test = () => {
  const [test, setTest] = useState<string>("");

  useEffect(() => {
    axios("/api/auth/test", {
      method: "GET",
    }).then((res) => {
      setTest(res.data);
    });
  }, [test]);

  return <div>Test result: {test}</div>;
};

export default Test;
