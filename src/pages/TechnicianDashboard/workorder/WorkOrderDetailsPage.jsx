import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import FormInput from "@/components/shared/FormInput";
import { Textarea } from "@/components/ui/textarea";
import FormSection from "@/components/shared/FormSection";
import EmployeeSection from "@/components/shared/EmployeeSection";
import {
  useTechnicianWorkOrderDetails,
  useUploadAfterImage,
  useDeleteGalleryImage,
  useCompleteWorkOrder,
} from "@/hooks/tehnician.hook";

const WorkOrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const { workOrder, isLoading, error } = useTechnicianWorkOrderDetails(id);
  console.log(workOrder);

  // Initialize React Hook Form
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      id: "WO-890",
      title: "Window repair in unit 205",
      category: "Construction",
      jobType: "Regular",
      priority: "Urgent",
      status: "Assigned",
      assignedTo: "John smith",
      hoursWorked: "8 hrs",
      dueDate: "July 25, 2023",
      hazardousCleanUp: "No",
      description: "Work order description details will be displayed here.",
      employees: [],
      complete_note: "",
      signature: "",
    },
  });

  // Field array for employees
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "employees",
  });

  const [beforePhotos, setBeforePhotos] = useState([
    {
      id: 1,
      file: null,
      preview: null,
      description:
        "Broken window with a visible crack. Requires immediate replacement.",
    },
  ]);
  const [afterPhotos, setAfterPhotos] = useState([
    {
      id: 1,
      file: null,
      preview: null,
      description: "Photo Description",
    },
  ]);

  const [signatureFile, setSignatureFile] = useState(null);

  const { mutate: uploadAfterImage, isPending: isUploadingAfter } =
    useUploadAfterImage();
  const { mutate: deleteGalleryImage, isPending: isDeletingImage } =
    useDeleteGalleryImage();
  const { mutate: completeWorkOrder, isPending: isCompleting } =
    useCompleteWorkOrder();

  const uploadAfterPhoto = (photo) => {
    if (!photo?.file) return;
    uploadAfterImage(
      { workOrderId: id, image: photo.file, note: photo.description },
      {
        onSuccess: (res) => {
          const server = res?.data;
          const url = server?.image_path;
          const serverId = server?.id;
          if (url) {
            setAfterPhotos((prev) =>
              prev.map((p) =>
                p.id === photo.id
                  ? { ...p, preview: url, file: null, id: serverId ?? p.id }
                  : p
              )
            );
          }
        },
        onError: (e) => {
          console.error("Failed to upload after photo", e);
        },
      }
    );
  };

  const handleRemoveAfter = (photo) => {
    const isServerPhoto =
      !photo.file &&
      typeof photo.preview === "string" &&
      photo.preview.length > 0;
    const imageId = Number(photo.id);

    if (isServerPhoto && Number.isFinite(imageId)) {
      deleteGalleryImage(
        { imageId },
        {
          onSuccess: () => {
            setAfterPhotos((prev) => prev.filter((p) => p.id !== photo.id));
          },
          onError: (e) => {
            console.error("Failed to delete image", e);
          },
        }
      );
    } else {
      // Local-only photo: just remove from state
      setAfterPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    }
  };

  const handleSignatureUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        setSignatureFile(file);
      }
    };
    input.click();
  };

  useEffect(() => {
    if (!workOrder) return;

    // Populate basic fields
    setValue("id", workOrder.uid || String(workOrder.id || ""));
    setValue("title", workOrder.title || "");
    setValue("category", workOrder.category || "");
    setValue("jobType", workOrder.job_type || "");
    setValue("priority", workOrder.priority || "");
    setValue("status", workOrder.status || "");

    const firstTech = Array.isArray(workOrder.technicians)
      ? workOrder.technicians[0]
      : undefined;
    setValue("assignedTo", firstTech?.name || "");
    const hours = firstTech?.pivot?.work_hours;
    setValue("hoursWorked", hours ? `${hours} hrs` : "");

    setValue("dueDate", workOrder.due_date || "");
    setValue("hazardousCleanUp", workOrder.hazardous_cleanup ? "Yes" : "No");
    setValue("description", workOrder.description || "");

    // Optional extras
    setValue("complete_note", workOrder.complete_note ?? "");
    setValue("signature", workOrder.signature ?? "");

    // Technicians -> employees field array
    const employees = (workOrder.technicians || []).map((t) => ({
      name: t.name || "",
      hours: Number(t?.pivot?.work_hours) || 0,
    }));
    replace(employees);

    // Galleries -> before/after photo sections
    const galleries = Array.isArray(workOrder.galleries)
      ? workOrder.galleries
      : [];

    const beforeApi = galleries.filter((g) => g.type === "before");
    const afterApi = galleries.filter((g) => g.type === "after");

    setBeforePhotos(
      beforeApi.map((g) => ({
        id: g.id,
        file: null,
        preview: g.image_path,
        description: g.description || "",
      }))
    );

    setAfterPhotos(
      afterApi.map((g) => ({
        id: g.id,
        file: null,
        preview: g.image_path,
        description: g.description || "",
      }))
    );
  }, [workOrder, setValue, replace]);

  // Add new employee to the field array
  const handleAddEmployee = (emp) => {
    append(emp ?? { name: "", hours: 0 });
  };

  // Remove employee from the field array
  const handleRemoveEmployee = (index) => {
    remove(index);
  };

  const handleAddBeforePhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            description: "",
          };
          setBeforePhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const handleAddAfterPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            description: "",
          };
          setAfterPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  //   // Remove local before photo only (before section does not persist yet)
  //   const handleRemoveBeforePhoto = (id) => {
  //     setBeforePhotos((prev) => prev.filter((photo) => photo.id !== id));
  //   };

  const handlePhotoUpload = (type, photoId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (type === "before") {
            setBeforePhotos((prev) =>
              prev.map((photo) =>
                photo.id === photoId
                  ? { ...photo, file: file, preview: e.target.result }
                  : photo
              )
            );
          } else {
            setAfterPhotos((prev) =>
              prev.map((photo) =>
                photo.id === photoId
                  ? { ...photo, file: file, preview: e.target.result }
                  : photo
              )
            );
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const onSubmit = (data) => {
    const note = (data?.complete_note ?? "").trim();
    if (!note) {
      console.error("Completion note is required");
      return;
    }
    if (!signatureFile) {
      console.error("Signature image is required");
      return;
    }
    if (!signatureFile.type?.startsWith("image/")) {
      console.error("Signature must be an image file");
      return;
    }
    console.log("Submitting completion", { workOrderId: id, note, hasSignature: !!signatureFile });
    // Complete work order: send signature image and completion note
    completeWorkOrder(
      { workOrderId: id, signatureFile, complete_note: note },
      {
        onSuccess: (res) => {
          console.log("Complete work order success", res);
          navigate("/technician/work-order");
        },
        onError: (e) => {
          const payload = e?.response?.data ?? e;
          console.error("Failed to complete work order", payload);
        },
      }
    );
  };

  // Handle loading and error states after all hooks are initialized
  if (isLoading) {
    return <div className="p-6">Loading work order...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">Failed to load work order</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-full mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            New Work Order Details
          </h1>
          <p className="text-gray-600 mt-1">Work Order ID: {watch("id")}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/technician/work-order")}
        >
          Back to Work Orders
        </Button>
      </div>

      {/* Work Order Details Section */}
      <FormSection
        title="New Work Order Details"
        className="bg-white p-6 rounded-lg"
      >
        <FormInput
          id="title"
          label="Work Order Title"
          register={register("title")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded-lg p-5 mt-6">
          <FormInput
            id="category"
            label="Category"
            register={register("category")}
          />

          <FormInput
            id="jobType"
            label="Job Type"
            register={register("jobType")}
          />

          <FormInput
            id="priority"
            label="Priority"
            register={register("priority")}
            labelClassName="text-red-600"
            className="border-red-300"
          />

          <FormInput id="status" label="Status" register={register("status")} />

          <FormInput
            id="assignedTo"
            label="Assign to"
            register={register("assignedTo")}
          />

          <FormInput
            id="hoursWorked"
            label="Hours worked"
            register={register("hoursWorked")}
          />

          <FormInput
            id="dueDate"
            label="Due Date"
            register={register("dueDate")}
          />

          <FormInput
            id="hazardousCleanUp"
            label="Hazardous Clean Up"
            register={register("hazardousCleanUp")}
          />
        </div>

        <div className="mt-6 space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Work order description details will be displayed here."
            rows={4}
          />
        </div>
      </FormSection>

      {/* Before Photos Section */}
      <FormSection title="Before Photos">
        <div className="space-y-4">
          {beforePhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="mb-4">
                <div
                  className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handlePhotoUpload("before", photo.id)}
                >
                  {photo.preview ? (
                    <img
                      src={photo.preview}
                      alt="Before photo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload photo
                      </p>
                    </div>
                  )}
                </div>
                <Textarea
                  value={photo.description}
                  onChange={(e) => {
                    setBeforePhotos((prev) =>
                      prev.map((p) =>
                        p.id === photo.id
                          ? { ...p, description: e.target.value }
                          : p
                      )
                    );
                  }}
                  placeholder="Photo description"
                  rows={2}
                  className="w-full"
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddBeforePhoto}
            className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 py-8"
          >
            <Camera className="w-5 h-5 mr-2" />
            Add Before Photo
          </Button>
        </div>
      </FormSection>

      {/* Add Employee Section */}
      <EmployeeSection
        fields={fields}
        register={register}
        onAddEmployee={handleAddEmployee}
        onRemoveEmployee={handleRemoveEmployee}
        workOrderId={id}
      />

      {/* After Photos Section */}
      <FormSection title="After Photos">
        <div className="space-y-4">
          {afterPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="mb-4">
                <div
                  className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handlePhotoUpload("after", photo.id)}
                >
                  {photo.preview ? (
                    <img
                      src={photo.preview}
                      alt="After photo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload photo
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between">
                  <Textarea
                    value={photo.description}
                    onChange={(e) => {
                      setAfterPhotos((prev) =>
                        prev.map((p) =>
                          p.id === photo.id
                            ? { ...p, description: e.target.value }
                            : p
                        )
                      );
                    }}
                    placeholder="Photo Description"
                    rows={2}
                    className="flex-1 mr-4"
                  />
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => uploadAfterPhoto(photo)}
                    disabled={!photo.file || isUploadingAfter}
                    className="mr-2"
                  >
                    {isUploadingAfter ? "Uploading..." : "Upload"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveAfter(photo)}
                    disabled={isDeletingImage}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={handleAddAfterPhoto}
            className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400 py-8"
          >
            <Camera className="w-5 h-5 mr-2" />
            Add After Photo
          </Button>
        </div>
      </FormSection>

      {/* Completion Note Section */}
      <FormSection title="Completion Note">
        <Textarea
          id="complete_note"
          {...register("complete_note")}
          placeholder="DESCRIBE THE WORK TO BE DONE"
          rows={6}
        />
      </FormSection>

      {/* Digital Signature Section */}
      <FormSection title="Digital Signature">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSignatureUpload}
              className="mr-2"
            >
              Upload Signature Image
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setValue("signature", "");
              setSignatureFile(null);
            }}
            className="text-red-600 hover:text-red-700"
          >
            Clear
          </Button>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-48 p-4 flex items-center justify-center">
          {signatureFile ? (
            <div className="w-full text-center">
              <img
                src={URL.createObjectURL(signatureFile)}
                alt="Signature preview"
                className="mx-auto max-h-48 object-contain rounded"
              />
              <p className="text-gray-600 mt-2">Signature ready to submit</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✍️</span>
              </div>
              <p className="text-gray-600">
                Sign canvas using your mouse or finger
              </p>
            </div>
          )}
        </div>
      </FormSection>

      {/* Complete Work Order Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
          disabled={isCompleting}
        >
          {isCompleting ? "Completing..." : "Complete Work Order"}
        </Button>
      </div>
    </form>
  );
};

export default WorkOrderDetailsPage;
