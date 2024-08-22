import { Checkbox2 } from "@/components/ui/checkbox2"
import Image from "next/image"

export default function CodiObert() {
    return (
        <main className="px-4 mx-auto my-12 max-w-6xl">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Codi Obert</h2>
                <p className="text-lg">El codi està penjat a un repositori de GitHub. Qualsevol el pot millorar i penjar la seva còpia. El projecte està configurat en un docker compose amb dues parts:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li className="text-lg">API: Un contenidor que serveix una API feta en Go.</li>
                    <li className="text-lg">Front-end: Un contenidor de la interfície feta amb Next.js i shadcn/ui.</li>
                </ul>
                <p className="text-lg">Algunes idees pendents que poden millorar el projecte:</p>
                <ul className="list-disc list-inside space-y-2">
                    <div className="flex items-start space-x-2">
                        <Checkbox2 checked disabled className="mt-1.5" />
                        <p className="text-lg">Traduir el nom d’algunes categories com ara “Just Chatting” o “Sports”.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Checkbox2 checked disabled className="mt-1.5"/>
                        <p className="text-lg">Ocultar etiquetes redundants com serien “Català”, “catalan” o “Catalunya”.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Checkbox2 disabled className="mt-1.5" />
                        <p className="text-lg">Una part on descobrir streamers que no estan en directe. Per exemple una llista dels streamers que més creixen.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Checkbox2 disabled className="mt-1.5" />
                        <p className="text-lg">Una part que enllaci a altres serveis que recomanen contingut en català.</p>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Checkbox2 disabled className="mt-1.5" />
                        <p className="text-lg">[No sé si és possible] Que es pugui iniciar sessió i importar les subscripcions, de manera que a la part superior apareguin els canals seguits que estan en directe.</p>
                    </div>
                </ul>
                <div className="flex justify-center">
                    <a href="https://github.com/angeldenom/directes-catala">
                        <Image alt="Repositori de GitHub" width={400} height={120} src="https://github-readme-stats.vercel.app/api/pin/?username=angeldenom&repo=directes-catala" className="max-w-full" />
                    </a>
                </div>
            </div>
        </main>
    )
}