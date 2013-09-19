package draw;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.json.JsonArray;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.core.logging.Logger;
import org.vertx.java.core.sockjs.SockJSServer;
import org.vertx.java.platform.Verticle;

/**
 * @author <a href="http://tfox.org">Tim Fox</a>
 */
public class BridgeServer extends Verticle {
  Logger logger;

  public void start() {
    logger = container.logger();
    
    HttpServer server = vertx.createHttpServer();

    // Also serve the static resources. In real life this would probably be done by a CDN
    server.requestHandler(new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {
        if (req.path().equals("/")) req.response().sendFile("index.html"); // Serve the index.html
        if (req.path().equals("/sender")) req.response().sendFile("sender.html"); // Serve the sender.html
        if (req.path().endsWith("vertxbus.js")) req.response().sendFile("vertxbus.js"); // Serve the js
        if (req.path().endsWith("drawBurr.js")) req.response().sendFile("drawBurr.js"); // Serve the js
        if (req.path().endsWith("drawBurrRec.js")) req.response().sendFile("drawBurrRec.js"); // Serve the js
        if (req.path().endsWith("leap.js")) req.response().sendFile("leap.js"); // Serve the js
        if (req.path().endsWith("d3.v3.min.js")) req.response().sendFile("d3.v3.min.js"); // Serve the js
      }
    });

    JsonArray permitted = new JsonArray();
    permitted.add(new JsonObject()); // Let everything through

    ServerHook hook = new ServerHook(logger);

    SockJSServer sockJSServer = vertx.createSockJSServer(server);
    sockJSServer.setHook(hook);
    sockJSServer.bridge(new JsonObject().putString("prefix", "/eventbus"), permitted, permitted);

    server.listen(Integer.parseInt(System.getenv("OPENSHIFT_DIY_PORT")),System.getenv("OPENSHIFT_DIY_IP"));
  }
}
