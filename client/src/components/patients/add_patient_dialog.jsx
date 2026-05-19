import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import api from "../../services/api";

const AddPatientDialog = ({ refresh }) => {
  const [open, set_open] = useState(false);

  const [form, set_form] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
  });

  const handle_change = (e) => {
    set_form({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    await api.post("/patients", form);

    set_open(false);
    refresh();
  };

  return (
    <Dialog open={open} onOpenChange={set_open}>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input name="name" placeholder="Name" onChange={handle_change} />
          <Input name="age" placeholder="Age" onChange={handle_change} />
          <Input name="gender" placeholder="Gender" onChange={handle_change} />
          <Input name="contact" placeholder="Contact" onChange={handle_change} />

          <Button onClick={submit} className="w-full">
            Save Patient
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;