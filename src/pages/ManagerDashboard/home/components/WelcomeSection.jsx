import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const WelcomeSection = () => {
  const navigate = useNavigate();

  const handleCreateWorkOrder = () => {
    navigate("/create-work-order");
  };
  const { userInfo } = useUser();

  return (
    <div className="bg-white p-6 rounded-lg ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">
            Welcome back, {userInfo?.name || "User"}!
          </h1>
          <p className="text-[#858D9D] mt-1">
            Here's what's happening with your work orders today.
          </p>
        </div>
        <Button
          onClick={handleCreateWorkOrder}
          className="bg-black hover:bg-[#5a5a5a] text-white px-4 py-5 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4 text-white" />
          <span>Create work order</span>
        </Button>
      </div>
    </div>
  );
};

export default WelcomeSection;
