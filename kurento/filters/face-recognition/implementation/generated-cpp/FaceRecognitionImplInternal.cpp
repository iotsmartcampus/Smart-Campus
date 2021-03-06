/* Autogenerated with kurento-module-creator */

#include <gst/gst.h>
#include "MediaPipeline.hpp"
#include "FaceRecognitionImpl.hpp"
#include "FaceRecognitionImplFactory.hpp"
#include "FaceRecognitionInternal.hpp"
#include <jsonrpc/JsonSerializer.hpp>
#include <KurentoException.hpp>

using kurento::KurentoException;

namespace kurento
{
namespace module
{
namespace facerecognition
{

MediaObjectImpl *FaceRecognitionImplFactory::createObjectPointer (const boost::property_tree::ptree &conf, const Json::Value &params) const
{
  kurento::JsonSerializer s (false);
  FaceRecognitionConstructor constructor;

  s.JsonValue = params;
  constructor.Serialize (s);

  return createObject (conf, constructor.getMediaPipeline() );
}

void
FaceRecognitionImpl::invoke (std::shared_ptr<MediaObjectImpl> obj, const std::string &methodName, const Json::Value &params, Json::Value &response)
{
  if (methodName == "setConfig") {
    kurento::JsonSerializer s (false);
    FaceRecognitionMethodSetConfig method;

    s.JsonValue = params;
    method.Serialize (s);

    method.invoke (std::dynamic_pointer_cast<FaceRecognition> (obj) );
    return;
  }

  OpenCVFilterImpl::invoke (obj, methodName, params, response);
}

bool
FaceRecognitionImpl::connect (const std::string &eventType, std::shared_ptr<EventHandler> handler)
{

  if ("IdPerson" == eventType) {
    std::weak_ptr<EventHandler> wh = handler;

    sigc::connection conn = signalIdPerson.connect ([ &, wh] (IdPerson event) {
      std::shared_ptr<EventHandler> lh = wh.lock();
      if (!lh)
        return;

      std::shared_ptr<IdPerson> ev_ref (new IdPerson(event));
      auto object = this->shared_from_this();

      lh->sendEventAsync ([ev_ref, object, lh] {
        JsonSerializer s (true);

        s.Serialize ("data", ev_ref.get());
        s.Serialize ("object", object.get());
        s.JsonValue["type"] = "IdPerson";

        lh->sendEvent (s.JsonValue);
      });
    });
    handler->setConnection (conn);
    return true;
  }

  return OpenCVFilterImpl::connect (eventType, handler);
}

void
FaceRecognitionImpl::Serialize (JsonSerializer &serializer)
{
  if (serializer.IsWriter) {
    try {
      Json::Value v (getId() );

      serializer.JsonValue = v;
    } catch (std::bad_cast &e) {
    }
  } else {
    throw KurentoException (MARSHALL_ERROR,
                            "'FaceRecognitionImpl' cannot be deserialized as an object");
  }
}
} /* facerecognition */
} /* module */
} /* kurento */

namespace kurento
{

void
Serialize (std::shared_ptr<kurento::module::facerecognition::FaceRecognitionImpl> &object, JsonSerializer &serializer)
{
  if (serializer.IsWriter) {
    if (object) {
      object->Serialize (serializer);
    }
  } else {
    std::shared_ptr<kurento::MediaObjectImpl> aux;
    aux = kurento::module::facerecognition::FaceRecognitionImplFactory::getObject (JsonFixes::getString(serializer.JsonValue) );
    object = std::dynamic_pointer_cast<kurento::module::facerecognition::FaceRecognitionImpl> (aux);
  }
}

void
Serialize (std::shared_ptr<kurento::module::facerecognition::FaceRecognition> &object, JsonSerializer &serializer)
{
  std::shared_ptr<kurento::module::facerecognition::FaceRecognitionImpl> aux = std::dynamic_pointer_cast<kurento::module::facerecognition::FaceRecognitionImpl> (object);

  Serialize (aux, serializer);
  object = std::dynamic_pointer_cast <kurento::module::facerecognition::FaceRecognition> (aux);
}

} /* kurento */