"use client";

import {
    useForm,
    SubmitHandler,
    useFieldArray,
    FieldErrors,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { DateOfToday } from "@/utils";

type FormType = {
    name: string;
    email: string;
    website: string;
    company: {
        bs: string;
        catchPhrase: string;
        name: string;
    };
    phoneNumbers: string[];
    phNums: { number: string }[];
    age: number;
    dob: Date;
};

export default function App() {
    const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        getValues,
        setValue,
        reset,
    } = useForm<FormType>({
        //** --- FETCH 'USER' OBJECT FOR INITIAL FORM VALUES --- */
        defaultValues: async () => {
            const result = await fetch(
                "https://jsonplaceholder.typicode.com/users/2",
            );
            const userData = await result.json();
            console.log(userData);

            return {
                ...userData,
                phoneNumbers: ["5524684808"],
                phNums: [{ number: "" }],
                age: 0,
                dob: DateOfToday(),
            };
        },
        //** -------------------------------------------- */
    });

    //** --- 'HANDLE 'ERRORS' --- */
    const { errors, isDirty, isValid } = formState;
    const { isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
    console.log(isSubmitting);

    //** --- 'ONSUBMIT' --- */
    const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
    const onError = (errors: FieldErrors<FormType>) => console.log(errors);

    //** ----------------- */

    //** --- init 'useFieldArray' for 'phNums' --- */
    const { fields, append, remove } = useFieldArray({
        name: "phNums",
        control,
    });
    //** ----------------------------------------- */

    //** --- 'Watch' fields --- "Re-Renders on every change" */
    const watchName = watch();
    //** --------------------- */

    //** --- "getValue" get values as 'watch' but 'does not Re-Render' and gets on action like buton click */
    const handleGetValues = () => {
        console.log(getValues());
    };
    //** --------------------------------------------------- */

    const resetForm = () => {
        reset();
    };

    return (
        <>
            {/* <h2>Watch Name : {JSON.stringify(watchName)}</h2> */}
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className=" max-w-md shadow shadow-primary rounded-lg mx-auto my-[4vh] py-[2vh] px-[4vw]
                space-y-[1vh]
            "
            >
                <div className="Name grid">
                    <label htmlFor="name" className=" font-semibold">
                        Name
                    </label>
                    <input
                        id="name"
                        className="input input-secondary input-sm"
                        {...register("name", {
                            minLength: {
                                value: 5,
                                message: "Name can't be less than 5 char.",
                            },
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.name?.message}
                    </p>
                </div>
                <div className="Email grid">
                    <label htmlFor="email" className=" font-semibold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="input input-secondary input-sm"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Unvalid email",
                            },
                            validate: {
                                badDomain: (value) => {
                                    return (
                                        !value.endsWith("baddomain.com") ||
                                        "This domain is not supported"
                                    );
                                },
                                noValid: (value) => {
                                    return (
                                        value !== "admin@example.com" ||
                                        "Enter different email"
                                    );
                                },
                            },
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.email?.message}
                    </p>
                </div>
                <div className="Website grid">
                    <label htmlFor="website" className=" font-semibold">
                        Website
                    </label>
                    <input
                        id="website"
                        className="input input-secondary input-sm"
                        {...register("website", {
                            pattern: {
                                value: /^[a-zA-Z0-9-]+\.([a-zA-Z]{2,})$/,
                                message:
                                    "website format must be like 'https://www.youtube.com/@Codevolution'",
                            },
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.website?.message}
                    </p>
                </div>

                {/** --- 'COMPANY' FIELD ---  */}
                <fieldset className="Company px-[1vw] bg-base-200 rounded-lg">
                    <legend
                        className=" text-center bg-base-100 py-[1vh] px-[2vw] rounded-xl font-semibold text-base-content"
                        style={{ fontVariant: "small-caps" }}
                    >
                        Company
                    </legend>
                    <div className="Company.Name grid">
                        <label
                            htmlFor="company-name"
                            className=" font-semibold"
                        >
                            Name
                        </label>
                        <input
                            id="company-name"
                            className="input input-secondary input-sm"
                            {...register("company.name")}
                        />
                        <p className=" text-error text-xs font-semibold py-[6px]">
                            {errors.name?.message}
                        </p>
                    </div>
                    <div className="Company-Bs grid">
                        <label htmlFor="company-bs" className=" font-semibold">
                            Bs
                        </label>
                        <input
                            id="company-bs"
                            className="input input-secondary input-sm"
                            {...register("company.bs", {
                                disabled: watch("company.name") === "",
                            })}
                        />
                        <p className=" text-error text-xs font-semibold py-[6px]">
                            {errors.name?.message}
                        </p>
                    </div>
                    <div className="Company.CatchPhrase grid">
                        <label
                            htmlFor="company-catchPhrase"
                            className=" font-semibold"
                        >
                            CatchPhrase
                        </label>
                        <input
                            id="company-catchPhrase"
                            className="input input-secondary input-sm"
                            {...register("company.catchPhrase", {
                                disabled: watch("company.name") === "",
                            })}
                        />
                        <p className=" text-error text-xs font-semibold py-[6px]">
                            {errors.name?.message}
                        </p>
                    </div>
                </fieldset>
                {/** ------------------------ */}

                {/** --- 'PHONE NUMBERS' FIELD ---  */}
                <div className="PhoneNumber0 grid">
                    <label htmlFor="phoneNumber0" className=" font-semibold">
                        Cell Phone
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber0"
                        className="input input-secondary input-sm"
                        {...register("phoneNumbers.0", {
                            required: {
                                value: true,
                                message: "Cell Phone can't be blank",
                            },
                            minLength: {
                                value: 10,
                                message: "Must be at least 10 number",
                            },
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.phoneNumbers?.[0]?.message}
                    </p>
                </div>
                <div className="PhoneNumber1 grid">
                    <label htmlFor="phoneNumber1" className=" font-semibold">
                        Work Phone
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber1"
                        className="input input-secondary input-sm"
                        {...register("phoneNumbers.1")}
                    />
                </div>
                {/** ------------------------ */}

                {/** --- 'DYNAMIC PHONE NUMBERS' FIELD WITH "useFieldArray" ---  */}
                <div className="PhNums space-y-[1vh]">
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="grid">
                                <label
                                    htmlFor={`field${index}`}
                                    className=" font-semibold"
                                >
                                    Phone Field - {index + 1}
                                </label>
                                <div className=" join flex">
                                    <input
                                        type="tel"
                                        id={`field${index}`}
                                        className="input input-secondary input-sm join-item grow"
                                        {...register(`phNums.${index}.number`)}
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className=" join-item btn btn-sm btn-secondary"
                                            onClick={() => remove(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <button
                        type="button"
                        className="btn btn-accent btn-sm w-full"
                        onClick={() => append({ number: "" })}
                        disabled={watch("phNums")?.some(
                            (num) => num.number === "",
                        )}
                    >
                        Add Another Phone
                    </button>
                </div>
                {/** ------------------------ */}

                {/** --- 'AGE' FIELD as 'numeric Value'---  */}
                <div className="Age grid">
                    <label htmlFor="age" className=" font-semibold">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        className="input input-secondary input-sm"
                        {...register("age", {
                            valueAsNumber: true,
                            required: "Age can't be blank",
                            min: {
                                value: 1,
                                message: "Must be greater than 0",
                            },
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.age?.message}
                    </p>
                </div>
                {/** ------------------------ */}

                {/** --- 'AGE' FIELD as 'numeric Value'---  */}
                <div className="Dob grid">
                    <label htmlFor="dob" className=" font-semibold">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dob"
                        className="input input-secondary input-sm"
                        {...register("dob", {
                            valueAsDate: true,
                            required: "Dob can't be blank",
                        })}
                    />
                    <p className=" text-error text-xs font-semibold py-[6px]">
                        {errors.dob?.message}
                    </p>
                </div>
                {/** ------------------------ */}

                <div className="Buttons flex gap-[1vw] items-center justify-center">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid}
                    >
                        Submit
                    </button>
                    {/* <DevTool control={control} /> */}
                    <button
                        type="button"
                        className="btn btn-accent btn-sm"
                        onClick={handleGetValues}
                    >
                        Get Values
                    </button>
                    <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        onClick={resetForm}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </>
    );
}
