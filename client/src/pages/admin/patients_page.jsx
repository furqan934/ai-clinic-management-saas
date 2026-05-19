import { useEffect, useState } from "react";
import api from "../../services/api";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import AddPatientDialog from "../../components/patients/add_patient_dialog";

const PatientsPage = () => {
  const [patients, set_patients] = useState([]);
  const [search, set_search] = useState("");

  const fetch_patients = async () => {
    const res = await api.get("/patients");
    set_patients(res.data.patients);
  };

  useEffect(() => {
    fetch_patients();
  }, []);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Patients Management
        </h1>

        <AddPatientDialog refresh={fetch_patients} />
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search patients..."
        value={search}
        onChange={(e) => set_search(e.target.value)}
      />

      {/* TABLE */}
      <Card className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-b">
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td className="capitalize">{p.gender}</td>
                <td>{p.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PatientsPage;