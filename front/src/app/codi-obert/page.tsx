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
                <ul className="list-disc list-inside space-y-1">
                    <li className="text-lg">Traduir el nom d’algunes categories com ara “Just Chatting” o “Sports”.</li>
                    <li className="text-lg">Ocultar etiquetes redundants com serien “català”, “catalan” o “valencià”.</li>
                    <li className="text-lg">Una part on descobrir streamers que no estan en directe. Per exemple una llista dels streamers que més creixen.</li>
                    <li className="text-lg">Una part que enllaci a altres serveis que recomanen contingut en català.</li>
                    <li className="text-lg">[No sé si és possible] Que es pugui iniciar sessió i importar les subscripcions, de manera que a la part superior apareguin els canals seguits que estan en directe.</li>
                </ul>
                <div className="flex justify-center">
                    <a href="https://github.com/angeldenom/directes-catala">
                        <img src="https://github-readme-stats.vercel.app/api/pin/?username=angeldenom&repo=directes-catala" className="max-w-full" />
                    </a>
                </div>
            </div>
        </main>
    )
}