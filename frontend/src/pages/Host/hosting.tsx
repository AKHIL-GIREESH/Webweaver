import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TbBrandVite } from "react-icons/tb";

const Hosting = () => {
    const [hosting, setHosting] = useState({
        repository: "",
        entrypoint: "",
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
        <div className="max-h-[100vh] w-[85vw] overflow-y-scroll">
            <p className="flex justify-center align-center text-3xl uppercase font-bold bg-gradient-to-br from-[#ffff00] via-[#f0c14b] to-[#b8860b] text-transparent bg-clip-text mb-3 mt-5">
                Make your project alive
            </p>
            <br />
            <Input
                name="repository"
                placeholder="Repository URL"
                value={hosting.repository}
                onChange={handleChange}
            />
            <Input
                name="entrypoint"
                placeholder="Entrypoint"
                value={hosting.entrypoint}
                onChange={handleChange}
            />
            <div className="my-4">
                <TbBrandVite />
            </div>
            <div className="space-y-2">
                <p className="font-semibold">Env Variables</p>
                {envFields.map((field, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                        <Input
                            placeholder="KEY"
                            value={field.key}
                            onChange={(e) => handleEnvChange(idx, "key", e.target.value)}
                        />
                        <Input
                            placeholder="VALUE"
                            value={field.value}
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
                <Button variant="auth" onClick={addEnvField}>
                    Add +
                </Button>
            </div>
            <div className="mt-5">
                <Button variant="auth">Host</Button>
            </div>

            <pre className="mt-5 p-2 rounded">
                {JSON.stringify(hosting, null, 2)}
            </pre>
        </div>
    );
};

export default Hosting;
