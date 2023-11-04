import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
// import ReactQuill from "react-quill";
import { QuillScript } from "@/utility/QuillScript";
import {
  read_single_blog__Request__API,
  update_blog__Request__API,
} from "@/utility/api";
import { SuccessToast } from "@/utility/FormHelper";


export function BlogUpdateDialog({ id }) {

  let titleRef,
    imgCDNRef = useRef();
  const [editorData, setEditorData] = useState("");
  const [blog, setBlog] = useState([]);
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(!open);
    read_single_blog__Request__API(id).then((res) => {
      setBlog(res?.data[0]);
      setEditorData(res?.data[0]?.des);
    });
  };

  const handelClose = () => {
    setOpen(false);
  };

  const submit = (id) => {
    let title = titleRef.value;
    let imgCDN = imgCDNRef.value;
    let des = editorData;
    update_blog__Request__API({ title, imgCDN, des, id }).then((res) => {
      if (res) {
        handelClose();
        SuccessToast("Blog update successful!");
      }
    });
  };

  return (
    <>
      <span
        onClick={handleOpen}
        x-data="{ tooltip: 'Edite' }"
        className="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
          x-tooltip="tooltip"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
      </span>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Edit Blog
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handelClose}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              ID = {blog?.id}
            </Typography>
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Title
            </Typography>
            <input
              className="border p-2 border-gray-300"
              placeholder="Title"
              defaultValue={blog?.title}
              ref={(input) => (titleRef = input)}
            />
            <input
              className="border p-2 border-gray-300"
              placeholder="Img CDN"
              defaultValue={blog?.imgCDN}
              ref={(input) => (imgCDNRef = input)}
            />
            {/*<ReactQuill*/}
            {/*  className=" block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner min-h-[200px] h-[300px] pb-[50px] overflow-y-auto"*/}
            {/*  theme="snow"*/}
            {/*  value={editorData}*/}
            {/*  onChange={setEditorData}*/}
            {/*  modules={QuillScript.modules}*/}
            {/*  formats={QuillScript.formats}*/}
            {/*/>*/}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handelClose}>
            cancel
          </Button>
          <Button
            variant="gradient"
            color="gray"
            onClick={() => submit(blog?.id)}
          >
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
