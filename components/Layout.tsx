import { ReactElement } from "react";
import Head from "next/head";

type LayoutProps = Required<{
    readonly children: ReactElement
    title: string
    description: string
}>

export const Layout = ({ children, title, description }: LayoutProps) => (
    <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Head>

        {children}
    </>
)