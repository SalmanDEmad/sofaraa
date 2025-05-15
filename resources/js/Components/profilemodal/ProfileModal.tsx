import React from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import NavTab from "./NavTab";

// Define Tutor type
interface Tutor {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  subjects: string[];
  qualifications: string[];
  availability: string[];
  contact: string;
}

interface ProfileModalProps {
  tutor: Tutor | null;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ tutor, onClose }) => {
  if (!tutor) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
    >
      <Dialog.Panel className="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] transition-transform transform scale-95 sm:scale-100">
        <button
          type="button"
          className="absolute top-4 right-4 p-2 text-gray-300 hover:text-gray-100 transition-colors"
          onClick={onClose}
        >
          <X className="w-7 h-7" />
        </button>
        <div className="flex gap-6 p-6 mb-6">
          <div className="relative w-1/5">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-full object-cover rounded-full border-4 border-yellow-400 shadow-md"
            />
            <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs px-1 py-1 rounded-lg">
              {tutor.category}
            </div>
          </div>

          <div className="flex-1 my-auto">
            <h2 className="text-2xl font-extrabold text-white mb-3">
              {tutor.name}
            </h2>
            <p className="text-base text-gray-300 mb-4">{tutor.description}</p>
          </div>
        </div>


        <div className="rounded-lg">
          <NavTab
            subjects={tutor.subjects}
            qualifications={tutor.qualifications}
            availability={tutor.availability}
            contact={tutor.contact}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ProfileModal;
