import { getServerSession } from 'next-auth';
import { ProfileForm } from './ProfileForm';
import { redirect } from 'next/navigation';
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from '../../lib/prisma';
import { SignOutButton } from '../../components/buttons';


export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin');
    }

    const currentUserEmail = session?.user?.email!;
    console.log(session?.user)
    const user = await prisma.user.findUnique({
        where: {
            email: currentUserEmail,
        },
    });

    return (
        <>
            <h1>Dashboard</h1>
            <SignOutButton />
            <ProfileForm user={user} />
        </>
    );
}