import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function AddUserForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  // handle input change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // create user API call
  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 🔥 backend route match
      const res = await apiRequest("POST", "/api/users/create", form);
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "User created successfully",
        });

        onSuccess(); // refresh table
        onClose();   // close modal
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Username *</label>
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password *</label>
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email *</label>
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>

      <div>
        <label className="text-sm font-medium">First Name</label>
        <Input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Last Name</label>
        <Input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </Button>
      </div>
    </div>
  );
}

export default AddUserForm;
