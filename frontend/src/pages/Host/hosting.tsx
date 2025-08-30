import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaReact } from "react-icons/fa";

const Hosting = () => {
    const [hosting, setHosting] = useState({
        repository: "",
        entrypoint: "",
        instanceip: "",

        framework: "react",
        env: {} as Record<string, string>,
    });

    const [envFields, setEnvFields] = useState<{ key: string; value: string }[]>(
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHosting((prev) => ({ ...prev, [name]: value }));
    };

    const handleEnvChange = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        const updatedFields = [...envFields];
        updatedFields[index][field] = value;
        setEnvFields(updatedFields);

        syncEnvToHosting(updatedFields);
    };

    const addEnvField = () => {
        setEnvFields((prev) => [...prev, { key: "", value: "" }]);
    };

    const deleteEnvField = (index: number) => {
        const updatedFields = envFields.filter((_, i) => i !== index);
        setEnvFields(updatedFields);

        syncEnvToHosting(updatedFields);
    };

    const syncEnvToHosting = (fields: { key: string; value: string }[]) => {
        const envObj: Record<string, string> = {};
        fields.forEach(({ key, value }) => {
            if (key.trim()) envObj[key] = value;
        });
        setHosting((prev) => ({ ...prev, env: envObj }));
    };

    return (
        <div className="max-h-[100vh] w-[82vw] ml-[3vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                Make your project alive
            </p>
            <br />
            <Input
                name="repository"
                placeholder="Repository URL"
                value={hosting.repository}
                onChange={handleChange}
                className="rounded w-[60vw]"
            />
            <Input
                name="entrypoint"
                placeholder="Entrypoint"
                value={hosting.entrypoint}
                onChange={handleChange}
                className="rounded w-[60vw] mt-3"
            />
            <Input
                name="instanceip"
                placeholder="Instance IP"
                value={hosting.instanceip}
                onChange={handleChange}
                className="rounded w-[60vw] mt-3"
            />
            <br />
            <div className="my-4">
                <p className="font-semibold text-3xl uppercase">Framework</p>
                <FaReact className="text-6xl " />
            </div>
            <br />
            <div className="space-y-2">
                <div className="flex items-center gap-10">
                    <p className="font-semibold text-3xl uppercase">Env Variables</p>
                    <Button variant="auth" onClick={addEnvField}>
                        Add +
                    </Button>
                </div>
                {envFields.map((field, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                        <Input
                            placeholder="KEY"
                            value={field.key}
                            className="rounded w-[30vw]"
                            onChange={(e) => handleEnvChange(idx, "key", e.target.value)}
                        />
                        <Input
                            placeholder="VALUE"
                            value={field.value}
                            className="rounded w-[30vw]"
                            onChange={(e) => handleEnvChange(idx, "value", e.target.value)}
                        />
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteEnvField(idx)}
                        >
                            🗑️
                        </Button>
                    </div>
                ))}
            </div>
            <br />
            <br />
            <div className="mt-5">
                <Button variant="auth">Host</Button>
            </div>

            {/* <pre className="mt-5 p-2 rounded">
                {JSON.stringify(hosting, null, 2)}
            </pre> */}
        </div>
    );
};

export default Hosting;
