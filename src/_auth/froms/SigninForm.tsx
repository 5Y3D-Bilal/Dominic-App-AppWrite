import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { useSignInAccount } from "@/lib/react-query/querysAndMutitations";
import { SigninValidation } from "@/lib/Validatin";
import { useUserContext } from "@/context/AuthContext";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SigninValidation>) => {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please add ",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went worng",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="https://i.pinimg.com/originals/ee/ab/14/eeab145208cac14b5e602d3fb642db89.jpg"
          className="w-16 h-16 rounded-full"
          alt="logo"
        />

        <h2 className="h3-bold md:h2-bold ">Login to your account</h2>
        <p className="text-light-3 small-medium md:base-regular">
          Welcome back! please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center">
                <img
                  src="assets/images/loader.svg"
                  className="w-5 h-5 mr-1"
                  alt=""
                />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Dont have a account.
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              register
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
